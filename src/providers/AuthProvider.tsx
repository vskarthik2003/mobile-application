import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

// ─── Types ─────────────────────────────────────────────────────────────────

export interface CustomerDetails {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

type AuthState =
  | { isAuthenticated: false; customer: null; token: null }
  | { isAuthenticated: true; customer: CustomerDetails; token: string };

type AuthContextValue = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

// ─── Context ───────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    customer: null,
    token: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, _password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual Shopify Customer Account API call
      // Simulated login — swap for real Storefront customerAccessTokenCreate mutation
      await new Promise((r) => setTimeout(r, 800));
      setAuthState({
        isAuthenticated: true,
        token: "mock_customer_token",
        customer: {
          id: "cust_1",
          firstName: "Jane",
          lastName: "Merchant",
          email,
        },
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setAuthState({ isAuthenticated: false, customer: null, token: null });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ ...authState, login, logout, isLoading }),
    [authState, login, logout, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
