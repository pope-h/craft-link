const Community = () => {
  return (
    <div className="bg-[#26220826] md:rounded-md w-[100vw] md:px-[5vw] p-8 mt-4 font-merriweather ">
      <p className="py-4">CONNECT, COLLABORATE, CREATE</p>
      <p className="py-4 font-alata text-3xl">Join Our Artisan Community</p>
      <div className="grid md:flex w-[70%] md:w-full gap-4 ">
        <label className="text-[14px] md:text-xl text-[#F9F1E2] leading-5 py-2">
          Email Address{""}
          <input type="email" placeholder={"Enter Email"} className="h-12 rounded-sm w-full focus:outline-[#1A1203] px-2 text-base drop-shadow-md placeholder:text-[#D8D6CF] placeholder:px-4 bg-[#F2E8CF0A] border-[1px] border-[#F2E8CF0A]"/>
        </label>
        <button className="bg-[#FFD700] text-[#1A1203]  h-12 self-center relative top-[12px] rounded-sm w-full md:w-44">JOIN FOR FREE</button>
      </div>
    </div>
  );
};
export default Community;
