"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { LoginForm } from "./LoginForm";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  signOut: async () => {},
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Auth session error:", error.message);
        // If refresh token is invalid, clear everything
        if (error.message.includes("Refresh Token Not Found") || error.message.includes("invalid")) {
          supabase.auth.signOut();
        }
      }
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        localStorage.removeItem("hbf_admin_last_active");
      }
      
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Inactivity auto-logout (15 minutes)
  useEffect(() => {
    if (!session) return;

    const INACTIVITY_LIMIT = 7 * 60 * 1000; // 7 minutes

    const checkInactivity = async () => {
      const lastActive = localStorage.getItem("hbf_admin_last_active");
      if (lastActive) {
        const elapsed = Date.now() - parseInt(lastActive, 10);
        if (elapsed > INACTIVITY_LIMIT) {
          console.log("Inactivity limit reached, logging out...");
          localStorage.removeItem("hbf_admin_last_active");
          await supabase.auth.signOut();
          return true; // Was logged out
        }
      }
      return false;
    };

    const resetTimer = () => {
      localStorage.setItem("hbf_admin_last_active", Date.now().toString());
    };

    // Check immediately on mount/session change
    checkInactivity();
    // Only reset if we didn't just logout
    resetTimer();

    const events = ["mousemove", "keydown", "mousedown", "scroll", "touchstart"];
    
    let throttleTimer: NodeJS.Timeout | null = null;
    const handleActivity = async () => {
      if (throttleTimer) return;
      
      // IMPORTANT: Check if we SHOULD have been logged out BEFORE resetting the timer
      const loggedOut = await checkInactivity();
      if (loggedOut) return;

      throttleTimer = setTimeout(() => {
        resetTimer();
        throttleTimer = null;
      }, 2000); // Throttle to 2 seconds
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkInactivity();
      }
    };

    events.forEach((event) => window.addEventListener(event, handleActivity));
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Check periodically
    const intervalId = setInterval(checkInactivity, 30 * 1000); // Check every 30 seconds

    return () => {
      events.forEach((event) => window.removeEventListener(event, handleActivity));
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(intervalId);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, [session]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (isLoading) {
    return null;
  }

  // If not logged in, show login form instead of children
  if (!session) {
    return <LoginForm />;
  }

  return (
    <AuthContext.Provider value={{ session, user, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
