export default function Loading() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-heading text-primary mb-2">LunaFlow</h2>
        <p className="text-body">Loading your cycle companion...</p>
      </div>
    </div>
  );
}
