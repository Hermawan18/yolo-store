import ButtonRegister from './components/ButtonRegister';
import FormLogin from './components/FormLogin';

export default function Login() {
  return (
    <div className="bg-white">
      <div className="flex mt-10 pb-5">
        <div className="flex-1 px-3">
          <FormLogin />
        </div>
        <div className="flex-1 px-5">
          <h1 className="text-4xl font-bold mb-2">BUAT AKUN</h1>
          <p>Jika Anda membuat akun, Anda bisa mendapatkan layanan yang dipersonalisasi seperti melihat riwayat pembelian dan mendapatkan kupon diskon dengan keanggotaan Anda. Daftar hari ini, gratis!</p>
          <ButtonRegister>BUAT AKUN</ButtonRegister>
        </div>
      </div>
    </div>
  );
}
