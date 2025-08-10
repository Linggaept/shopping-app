const Loading = () => {
  return (
    <div
      className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center h-screen"
      style={{ zIndex: 1000 }}
    >
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default Loading;
