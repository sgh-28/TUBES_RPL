import { Link } from "react-router-dom";
import { useMeja } from "../pages/pelayan/MejaProvider";

function DetailMeja() {
    const { selectedMeja, updateMejaStatus } = useMeja();
    let pathimage= '';

    if (!selectedMeja) {
        return <div className='flex justify-center items-center h-full'>Pilih meja untuk detail</div>;
    }

    const handleStatusChange = () => {
        let status= '';
        {selectedMeja.status == 'kosong'?status='terisi':status='kosong'}
        updateMejaStatus(selectedMeja._id, status);
      };

    return (
        <div className="flex flex-col px-12 py-6 items-center gap-4">
            <h1 className="text-2xl font-medium">{selectedMeja.nama}</h1>
            <div className="flex flex-col items-center">
                <p>Kapasitas: {selectedMeja.kapasitas} Orang</p>
                <p>Status: {selectedMeja.status === 'kosong' ? 'Kosong' : 'Terisi'}</p>
            </div>
            <img src={`../${selectedMeja.kapasitas == 2?pathimage ='meja2.png':pathimage='meja4.png'}`} alt="meja" className={`${pathimage === 'meja2.png' ? 'max-w-32' : 'max-w-72'}`} />
            {selectedMeja.status == 'kosong'?
                <button
                    onClick={handleStatusChange}
                    className="bg-teal-600 px-20 py-3 hover:bg-teal-500 text-slate-50 text-lg rounded-lg transition-all duration-300"
                >
                    Ubah Status!
                </button>
                :
                <>
                    <button
                        onClick={handleStatusChange}
                        className="bg-teal-600 px-20 py-3 hover:bg-teal-500 text-slate-50 text-lg rounded-lg transition-all duration-300"
                    >
                        Ubah Status!
                    </button>
                    <Link
                        to={'/menu'}
                        className="bg-slate-300 px-20 py-3 hover:bg-slate-400 text-slate-800 text-lg rounded-lg transition-all duration-300"
                    >
                        Pesan !
                    </Link>
                </>

            }
                
      </div>
    )
}

export default DetailMeja