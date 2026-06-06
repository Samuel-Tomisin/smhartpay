


function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-12 sm:px-10 sm:py-16 md:px-14 md:py-20 lg:px-20 lg:py-24">
      {children}
    </div>
  );
}