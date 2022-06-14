import Header from "./Header";
import Footer from "./Footer";
import background from "/assets/background.png";

function Layout({ children }) {
  return (
    <div className="bg-fixed" style={{ backgroundImage: `url(${background})` }}>
      <div className="flex min-h-screen flex-col bg-gradient-to-r from-white">
        <Header />
        <main className="flex h-full w-full flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
