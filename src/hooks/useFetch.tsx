import { useState } from "react";
interface User {
    id: string;
    email: string;
    role: string;
    lastSignIn: string;
    emailVerified: boolean;
}

interface Session {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
}

interface LoginResponse {
    user: User;
    session: Session;
}
export const useFetch = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const execute = async (fetchFn: () => Promise<any>) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchFn();

            // Handle and structure the response
            const user = response?.user;
            const session = response?.session;

            if (!user || !session) {
                throw new Error("Incomplete data received from the server");
            }

            // Extract and structure data
            const structuredData: LoginResponse = {
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    lastSignIn: user.last_sign_in_at,
                    emailVerified: user.user_metadata?.email_verified || false,
                },
                session: {
                    accessToken: session.access_token,
                    refreshToken: session.refresh_token,
                    expiresAt: session.expires_at,
                },
            };

            return structuredData; // Return for immediate use
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || "An error occurred");
            } else {
                setError("An error occurred");
            }
            throw err; // Re-throw for further handling
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, execute };
};
