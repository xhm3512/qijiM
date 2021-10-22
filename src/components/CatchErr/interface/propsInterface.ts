export interface ErrorBoundaryProps {
  children: React.ReactNode;
  textErr: string | React.ReactNode;
}

export interface ComponentProps {
  fallback?: (err?: Error) => React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  err?: Error | undefined;
}
export interface ErrorProps {
  l?: number;
  d?: string;
  f?: string;
  textErr: string | React.ReactNode;
}
