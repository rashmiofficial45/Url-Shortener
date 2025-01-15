import { createContext, useState, useEffect, ReactNode } from "react";
import { Session, useFetch, User } from "../hooks/useFetch"; // Import your custom hook
import { getCurrentUser } from "../api/auth"; // Import getCurrentUser function

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  error: null,
});

interface UrlProviderProps {
  children: ReactNode;
}

export const UrlProvider = ({ children }: UrlProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const { loading, error, execute } = useFetch();

  useEffect(() => {
    // Fetch current user on component mount
    const fetchUser = async () => {
      try {
        const data = await execute(getCurrentUser);
        setUser(data.user);
        setSession(data.session);
        console.log(`User: ${data.user}, Session: ${data.session}`);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, [execute]);

  return (
    <AuthContext.Provider value={{ user, session, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
