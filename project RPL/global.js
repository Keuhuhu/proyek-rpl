// ISI FILE: aset/global.js (Disesuaikan dengan LocalStorage Anda)

document.addEventListener('DOMContentLoaded', () => {
    checkFloatingAntrian();
});

async function checkFloatingAntrian() {
    try {
        // PERBAIKAN DI SINI: Sesuaikan nama key dengan image_1a60a0.jpg
        const token = localStorage.getItem('token_user'); // Dulu 'token'
        const userId = localStorage.getItem('id_user');   // Dulu ambil dari object 'user'
        
        // Cek elemen HTML box
        const boxAntrian = document.getElementById('stickyAntrian');
        if (!boxAntrian) return;

        // Cek Login
        if (!token || !userId) {
            console.log("User belum login (token_user/id_user tidak ada).");
            return;
        }

        // PENTING: Gunakan http://localhost:3000 jika testing lokal
        const url = `/antrian/check/${userId}`; 

        const response = await fetch(url, {
            method: 'GET',
            headers: { 
                'Authorization': `Bearer ${token}` 
            }
        });

        if (!response.ok) return;

        const result = await response.json();
        const txtNomor = document.getElementById('stickyNomor');
        const txtEstimasi = document.getElementById('stickyEstimasi');

        if (result.exists) {
            // TAMPILKAN BOX
            boxAntrian.style.display = 'block';
            
            if (txtNomor) txtNomor.textContent = result.data.nomor_antrian;
            
            // Logika Estimasi (misal 3 menit per antrian)
            const estimasiWaktu = result.data.nomor_antrian * 5;
            if (txtEstimasi) txtEstimasi.textContent = `${estimasiWaktu} Menit`;
            
        } else {
            // SEMBUNYIKAN BOX
            boxAntrian.style.display = 'none';
        }

    } catch (error) {
        console.error("Gagal load antrian:", error);
    }
}