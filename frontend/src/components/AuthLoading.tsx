export default function AuthLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-green-500" />

        <p className="mt-4 text-sm text-gray-400">
          Checking authentication...
        </p>
      </div>
    </div>
  );
}