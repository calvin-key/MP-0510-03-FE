import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="mb-5 h-14 bg-black text-white md:mb-0">
      <div className="mx-5 flex h-full items-center justify-between">
        <div>
          <Link href="/" className="text-xl font-semibold">
            Scaena
          </Link>
        </div>
        <div className="hidden h-full items-center gap-2 md:flex">
          <Link
            href="/"
            className="rounded-full border-orange-400 px-5 py-2 hover:border-[1px] hover:text-orange-400"
          >
            Find Events
          </Link>
          <Link
            href="/"
            className="rounded-full border-orange-400 px-5 py-2 hover:border-[1px] hover:text-orange-400"
          >
            My Orders
          </Link>
          <Link
            href="/"
            className="rounded-full border-orange-400 px-5 py-2 hover:border-[1px] hover:text-orange-400"
          >
            Host Events
          </Link>
          <Link
            href="/login"
            className="rounded-full border-orange-400 px-5 py-2 hover:border-[1px] hover:text-orange-400"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
