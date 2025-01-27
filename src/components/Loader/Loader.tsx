type LoaderProps = {
  className?: string;
};

const Loader = ({ className = ""}: LoaderProps) => {
  return (
    <div className={`flex items-center justify-center h-screen bg-transparent ${className}`}>
      <div className="h-16 w-16 border-4 border-solid rounded-full animate-spin border-white border-t-transparent" />
    </div>
  );
}

export default Loader;