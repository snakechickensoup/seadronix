import Header from './header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full max-w-screen-sm h-dvh bg-secondary text-primary'>
      <div className='relative flex flex-col h-full'>
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
