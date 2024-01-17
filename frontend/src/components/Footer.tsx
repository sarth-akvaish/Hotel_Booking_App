const Footer = () => {
  return (
    <div className="bg-blue-800 py-6">
      <div className="px-2 md:mx-4 flex justify-between items-center">
        <span className="text-[24px] md:text-3xl text-white font-bold tracking-tight">
          GoVac.com
        </span>
        <span className="text-white font-bold tracking-tight text-[13px] md:text-[16px] flex gap-2 md:gap-4">
          <p className="cursor-pointer">Privacy policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
