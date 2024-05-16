import Logo from 'assets/images/rs_flag.png';

export default function Home() {
  return (
    <div className='flex w-full justify-center'>
      <div className="flex max-w-96">
        <img src={Logo} alt="logo" />
      </div>
    </div>
  );
}