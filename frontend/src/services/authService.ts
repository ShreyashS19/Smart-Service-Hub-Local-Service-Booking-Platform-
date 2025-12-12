const BACKEND_URL = import.meta.env.VITE_API_BASE;

interface LoginRequest {
  mobile: string;
  password: string;
  role: string;
}

interface SignupRequest {
  fullName: string;
  mobile: string;
  email?: string;
  password: string;
  role: string;
  serviceType?: string;
  experience?: number;
  price?: string;
  availability?: string;
  location?: string;
}

interface AuthResponse {
  message: string;
  role: string;
  redirectUrl: string;
  id: number;
  fullName: string;
  email: string;
  mobile: string;
}


export enum ErrorType {
  USER_NOT_FOUND = "USER_NOT_FOUND",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  NETWORK_ERROR = "NETWORK_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  DUPLICATE_ACCOUNT = "DUPLICATE_ACCOUNT",
  SERVER_ERROR = "SERVER_ERROR",
}

export class AuthError extends Error {
  type: ErrorType;
  statusCode?: number;
  details?: Record<string, string>;

  constructor(
    message: string,
    type: ErrorType,
    statusCode?: number,
    details?: Record<string, string>
  ) {
    super(message);
    this.name = "AuthError";
    this.type = type;
    this.statusCode = statusCode;
    this.details = details;

    Object.setPrototypeOf(this, AuthError.prototype);
  }
}


class AuthService {
  private readonly baseURL = `${BACKEND_URL}/api/auth`;

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        const error = this.parseError(response.status, data);
        throw error;
      }

      return data as AuthResponse;
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      throw this.createNetworkError(error);
    }
  }

  async register(userData: SignupRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseURL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        const error = this.parseError(response.status, data);
        throw error;
      }

      return data as AuthResponse;
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      throw this.createNetworkError(error);
    }
  }

  private parseError(
    statusCode: number,
    data: Record<string, any>
  ): AuthError {
    const message = data.message || "An error occurred";
    let errorType: ErrorType;
    let details: Record<string, string> | undefined;

    switch (statusCode) {
      case 400:
        if (
          message.includes("Invalid credentials") ||
          message.includes("User not found")
        ) {
          errorType = ErrorType.USER_NOT_FOUND;
        } else if (message.includes("already")) {
          errorType = ErrorType.DUPLICATE_ACCOUNT;
        } else {
          errorType = ErrorType.VALIDATION_ERROR;
          details = data.details || {};
        }
        break;

      case 409:
        errorType = ErrorType.DUPLICATE_ACCOUNT;
        break;

      case 500:
      case 502:
      case 503:
        errorType = ErrorType.SERVER_ERROR;
        break;

      default:
        errorType = ErrorType.VALIDATION_ERROR;
    }

    return new AuthError(message, errorType, statusCode, details);
  }

  private createNetworkError(error: any): AuthError {
    return new AuthError(
      "Unable to connect to server. Please check your internet connection.",
      ErrorType.NETWORK_ERROR,
      0
    );
  }

  storeSession(userData: AuthResponse): void {
    localStorage.setItem("userData", JSON.stringify(userData));
  }

  getSession(): AuthResponse | null {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  }

  clearSession(): void {
    localStorage.removeItem("userData");
  }

  isAuthenticated(): boolean {
    return !!this.getSession();
  }

  getUserId(): number | null {
    const session = this.getSession();
    return session ? session.id : null;
  }

  getUserRole(): string | null {
    const session = this.getSession();
    return session ? session.role : null;
  }
}

export const authService = new AuthService();

export const getErrorMessage = (error: AuthError): string => {
  switch (error.type) {
    case ErrorType.USER_NOT_FOUND:
      return "Account not found. This phone number is not registered with us.";

    case ErrorType.INVALID_CREDENTIALS:
      return "Invalid phone number or password. Please try again.";

    case ErrorType.DUPLICATE_ACCOUNT:
      return "This phone number is already registered. Please use a different number or login.";

    case ErrorType.VALIDATION_ERROR:
      return error.message || "Please check your input and try again.";

    case ErrorType.NETWORK_ERROR:
      return "Unable to connect to server. Please check your internet connection.";

    case ErrorType.SERVER_ERROR:
      return "Server error. Please try again later.";

    default:
      return "An error occurred. Please try again.";
  }
};

export const getErrorAction = (error: AuthError): string => {
  switch (error.type) {
    case ErrorType.USER_NOT_FOUND:
      return "Create Account";

    case ErrorType.DUPLICATE_ACCOUNT:
      return "Go to Login";

    default:
      return "Try Again";
  }
};

export const getErrorActionUrl = (error: AuthError): string => {
  switch (error.type) {
    case ErrorType.USER_NOT_FOUND:
      return "/signup";

    case ErrorType.DUPLICATE_ACCOUNT:
      return "/login";

    default:
      return "";
  }
};

export default authService;
