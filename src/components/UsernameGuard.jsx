import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

function UsernameGuard({ children }) {
  const { user, loading } = useAuth();
  const [checking, setChecking] = useState(true);
  const [hasUsername, setHasUsername] = useState(null);
  const userId = user?.id ?? null;

  useEffect(() => {
    let isMounted = true;

    const checkProfile = async () => {
      setChecking(true);

      if (!userId) {
        if (isMounted) {
          setChecking(false);
          setHasUsername(null);
        }
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", userId)
        .maybeSingle();

      if (!isMounted) return;

      if (!error && data?.username) {
        setHasUsername(true);
      } else {
        setHasUsername(false);
      }

      setChecking(false);
    };

    if (!loading) {
      checkProfile();
    }

    return () => {
      isMounted = false;
    };
  }, [userId, loading]);

  if (loading || checking) {
    return <Loader fullScreen />;
  }

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  if (!hasUsername) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}

export default UsernameGuard;
