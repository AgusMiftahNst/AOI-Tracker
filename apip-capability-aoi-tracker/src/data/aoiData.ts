
export interface AOIItem {
  id: string;
  code: string;
  title: string;
  actionPlan: string;
  exampleDoc?: string;
  status: 'Belum Selesai' | 'Proses' | 'Selesai';
  pic: string;
  completionDate: string;
  documentRef: string;
}

export interface Topic {
  id: string;
  name: string;
  aois: AOIItem[];
}

export interface Element {
  id: string;
  name: string;
  topics: Topic[];
}

export const aoiData: Element[] = [
  {
    id: 'elemen-1',
    name: 'Elemen 1 - Kualitas Peran dan Layanan',
    topics: [
      {
        id: 'e1-t1',
        name: 'Topik 1 - Penugasan Asurans (A11)',
        aois: [
          { 
            id: 'e1-t1-a11', 
            code: 'A11', 
            title: 'Pada pelaksanaan kegiatan asurans temuan tidak dilengkapi dengan analisis akar masalah serta tidak menguji risiko dan pengujian kecurangan. Simpulan tidak disampaikan atas ruang lingkup dan sesuai tujuan serta rekomendasi masih dominan bersifat administratif', 
            actionPlan: '1. Menyusun PKA yang memuat langkah kerja pengujian risiko dan fraud. 2. Menggeser fokus rekomendasi dari administratif (perbaikan dokumen) ke perbaikan strategis seperti perbaikan SOP, kebijakan atau pengendalian.',
            exampleDoc: 'https://docs.google.com/templates/PKA_RiskBased',
            status: 'Belum Selesai', 
            pic: 'Inspektur', 
            completionDate: '2026', 
            documentRef: '' 
          },
        ]
      },
      {
        id: 'e1-t2',
        name: 'Topik 2 - Penugasan Konsultansi (A12)',
        aois: [
          { 
            id: 'e1-t2-a12', 
            code: 'A12', 
            title: 'Ekspektasi kegiatan konsultansi terbatas pada tahap prosedural dan proses konsultansi belum mengarah pada perbaikan TKMRPI. Ekspektasi mitra kerja/pimpinan daerah selaku pemberi mandat dalam PKPT tidak diidentifikasi dan dinyatakan secara jelas dan menjadi indikator keberhasilan pelaksanaan dalam KAK maupun laporan hasil pelaksanaan kegiatan konsultansi serta hasil konsultansi APIP belum secara konsisten dapat mengatasi hambatan proses kinerja serta belum konsisten dilengkapi dengan penetapan penanggung jawab pelaksana tindak lanjut, tenggat waktu, dan mekanisme pemantauan yang memadai.', 
            actionPlan: '1. Menyusun SOP pemantauan tindak lanjut konsultansi. 2. Membuat laporan berkala kepada Kepala Daerah terkait laporan hasil konsultansi serta tindak lanjutnya, kemudian meminta tanggapan dan masukan terkait tindak lanjut. 3. Melakukan survei kepuasan kepada mitra kerja (OPD atau rekanan) di akhir penugasan untuk memastikan apakah solusi yang diberikan dapat mengatasi hambatan kinerja mereka.',
            exampleDoc: 'https://docs.google.com/templates/SOP_TindakLanjut',
            status: 'Belum Selesai', 
            pic: 'Inspektur', 
            completionDate: '2026', 
            documentRef: '' 
          },
        ]
      }
    ]
  },
  {
    id: 'elemen-2',
    name: 'Elemen 2 - Profesionalisme Penugasan',
    topics: [
      {
        id: 'e2-t1',
        name: 'Topik 1 - Pengembangan Informasi Awal (A21)',
        aois: [
          { 
            id: 'e2-t1-a21', 
            code: 'A21', 
            title: 'Penelaahan awal dan dokumentasi belum dilaksanakan secara konsisten serta belum menyelaraskan tujuan and sasaran pengawasan sesuai konteks/lingkungan strategis. Desain Penugasan Pengawasan belum memuat seluruh komponen. Pedoman pelaksanaan pengawasan belum mencakup identifikasi risiko klien/mitra/program yang menjadi objek pengawasan, risiko penugasan, batasan tanggung jawab, dan alokasi sumber daya, serta penetapan ruang lingkup pengawasan yang jelas (fokus, lokus, dan tempus).', 
            actionPlan: 'Mewajibkan tim melakukan penelaahan awal dan membuat PKA pada setiap penugasan dan disetujui oleh Pengendali Teknis melalui reviu berjenjang',
            exampleDoc: 'https://docs.google.com/templates/PKA_Template_Master',
            status: 'Belum Selesai', 
            pic: 'Inspektur', 
            completionDate: '2026', 
            documentRef: '' 
          },
        ]
      },
      {
        id: 'e2-t2',
        name: 'Topik 2 - Perencanaan Penugasan (A22)',
        aois: [
          { 
            id: 'e2-t2-a22', 
            code: 'A22', 
            title: 'Penyusunan program kerja audit belum sepenuhnya disusun berbasis risiko dan belum memuat langkah pengujian yang rinci per tujuan audit. Pembagian peran anggota tim, alokasi waktu, serta keterkaitan antara prosedur audit dengan risiko utama belum dirumuskan secara jelas dan terdokumentasi.', 
            actionPlan: '1. Menyusun format PKA yang dikaitkan langsung dengan tujuan audit, risiko utama dan pengendalian yang ada. 2. Mewajibkan reviu berjenjang atas PKA',
            exampleDoc: 'https://docs.google.com/templates/PKA_V2',
            status: 'Belum Selesai', 
            pic: 'Inspektur', 
            completionDate: '2026', 
            documentRef: '' 
          },
        ]
      },
      {
        id: 'e2-t3',
        name: 'Topik 3 - Pelaksanaan Penugasan (A23)',
        aois: [
          { 
            id: 'e2-t3-a23', 
            code: 'A23', 
            title: 'Data atau informasi yang diperoleh saat pelaksanaan penugasan belum dilakukan pengujian silang dengan sumber lainnya serta pembahasan notisi belum terdokumentasi secara memadai.', 
            actionPlan: 'Menggunakan format berita acara pembahasan notisi yang seragam serta didokumentasikan dengan baik',
            exampleDoc: 'https://docs.google.com/templates/BA_Notisi',
            status: 'Belum Selesai', 
            pic: 'Inspektur', 
            completionDate: '2026', 
            documentRef: '' 
          },
        ]
      },
      {
        id: 'e2-t4',
        name: 'Topik 4 - Komunikasi Hasil Penugasan (A24)',
        aois: [
          { 
            id: 'e2-t4-a24', 
            code: 'A24', 
            title: 'Laporan pengawasan belum memenuhi standar SAIPI. Laporan tersebut belum dilengkapi dengan tanggapan klien, dukungan bukti, serta rencana tindak lanjut. Belum diuraikannya pembatasan distribusi dan penggunaan hasil penugasan apabila disampaikan kepada pihak di luar klien serta belum dimuatnya hal-hal lain yang relevan terkait pemenuhan Kode Etik Auditor Intern Indonesia dan Standar Audit Intern Pemerintah Indonesia.', 
            actionPlan: '1. Menyusun ulang format laporan yang mewajibkan adanya sub bab Tanggapan auditi dan Rencana Tindak Lanjut. 2. Mewajibkan auditi menandatangani berita acara kesepakatan yang berisi rencana aksi, pejabat penanggung jawab dan batas waktu penyelesaian tindak lanjut. 3. Mencantumkan pernyataan tertulis dalam LHP bahwa penugasan telah dilaksanakan sesuai dengan Kode Etik dan SAIPI',
            exampleDoc: 'https://docs.google.com/templates/LHP_SAIPI_V3',
            status: 'Belum Selesai', 
            pic: 'Inspektur', 
            completionDate: '2026', 
            documentRef: '' 
          },
        ]
      },
      {
        id: 'e2-t5',
        name: 'Topik 5 - Pemantauan Tindak Lanjut (A25)',
        aois: [
          { 
            id: 'e2-t5-a25', 
            code: 'A25', 
            title: 'Pemanfaatan teknologi informasi dalam pengawasan masih terbatas pada pengolahan data dasar dan belum didukung kebijakan, roadmap, serta integrasi sistem audit dan analitika data untuk mendukung pengawasan berbasis risiko.', 
            actionPlan: 'Membangun sistem informasi audit yang terintegrasi mulai dari perencanaan, kertas kerja elektronik sampai laporan',
            status: 'Belum Selesai', 
            pic: 'Inspektur', 
            completionDate: '2026', 
            documentRef: '' 
          },
        ]
      },
      {
        id: 'e2-t6',
        name: 'Topik 6 - Pengendalian Kualitas Penugasan (A26)',
        aois: [
          { 
            id: 'e2-t6-a26', 
            code: 'A26', 
            title: 'Reviu berjenjang belum dilaksanakan secara menyeluruh pada tahapan pengawasan serta masih belum optimal mengidentifikasi adanya potensi hambatan/kendala penugasan pengawasan. Mekanisme penjaminan mutu internal atas penugasan juga belum dilaksanakan secara formal and konsisten pada seluruh penugasan, serta belum dilengkapi prosedur telaah sejawat eksternal dan evaluasi kualitas penugasan secara periodik (minimal sekali dalam tiga tahun) sebagai sarana peningkatan berkelanjutan.', 
            actionPlan: '1. Melakukan reviu berjenjang pada proses perencanaan pengawasan hingga pelaporan. 2. Memastikan telaah sejawat eksternal dilaksanakan minimal sekali dalam 3 tahun',
            status: 'Belum Selesai', 
            pic: 'Inspektur', 
            completionDate: '2026', 
            documentRef: '' 
          },
        ]
      }
    ]
  },
  {
    id: 'elemen-3',
    name: 'Elemen 3 - Manajemen Pengawasan',
    topics: [
      {
        id: 'e3-t1',
        name: 'Topik 1 - Perencanaan Pengawasan (A31)',
        aois: [
          { 
            id: 'e3-t1-a31', 
            code: 'A31', 
            title: 'Belum melaksanakan pemutakhiran pemetaan objek pengawasan dan PPBR secara berkala serta proses penyusunan PKPT belum sepenuhnya melibatkan auditan sebagai pemilik risiko serta belum secara kuat mengaitkan sasaran RPD (audit Universe tidak sesuai dengan sasaran yang termuat dalam RPD Kabupaten Paniai), risiko strategis daerah, dan penetapan prioritas objek pengawasan. Periodisasi penugasan dan strategi pengawasan juga belum sepenuhnya diselaraskani dengan tingkat risiko.', 
            actionPlan: '1. Menyelaraskan audit universe pada PKPT Berbasis risiko dengan sasaran yang termuat dalam RPJMD Tahun 2025-2029 Kabupaten Paniai',
            status: 'Belum Selesai', 
            pic: 'Inspektur', 
            completionDate: '2026', 
            documentRef: '' 
          },
        ]
      },
      {
        id: 'e3-t2',
        name: 'Topik 2 - Pelaporan kepada Manajemen K/L/D (A32)',
        aois: [
          { 
            id: 'e3-t2-a32', 
            code: 'A32', 
            title: 'Penyusunan laporan hasil pengawasan belum menyajikan opini makro maupun sintesis hasil pengawasan atas seluruh penugasan Inspektorat. Selain itu, policy brief yang tersedia masih terbatas pada ruang lingkup desa dan belum mencakup gambaran pengawasan secara menyeluruh. Rekomendasi yang dihasilkan belum mengarah pada perbaikan strategis kepada pimpinan daerah.', 
            actionPlan: '1. Menyampaikan ikhtisar hasil pengawasan secara berkala kepada Kepala Daerah. 2. Menyelenggarakan forum ekspos hasil pengawasan strategis secara tatap muka dengan Kepala Daerah and Sekda untuk membahas solusi atas kendala pencapaian kinerja',
            status: 'Belum Selesai', 
            pic: 'Inspektur', 
            completionDate: '2026', 
            documentRef: '' 
          },
        ]
      }
    ]
  },
  {
    id: 'elemen-4',
    name: 'Elemen 4 - Pengelolaan Kinerja dan Sumber Daya',
    topics: [
      {
        id: 'e4-t1',
        name: 'Topik 1 - Manajemen Kinerja (A41)',
        aois: [
          { 
            id: 'e4-t1-a41', 
            code: 'A41', 
            title: 'Belum terdapat sistem pengendalian kinerja dan reviu atau monitoring capaian kinerja.', 
            actionPlan: 'Melaksanakan rapat koordinasi rutin antara Inspektur dengan para inspektur Pembantu (Irban) untuk meninjau progres PKPT dan ketersediaan sumber daya',
            status: 'Belum Selesai', 
            pic: 'Inspektur', 
            completionDate: '2026', 
            documentRef: '' 
          },
        ]
      },
      {
        id: 'e4-t2',
        name: 'Topik 2 - Manajemen Sumber Daya Keuangan (A42)',
        aois: [
          { 
            id: 'e4-t2-a42', 
            code: 'A42', 
            title: 'Belum terdapat mekanisme/prosedur yang dapat menjamin ketersediaan alokasi anggaran yang adaptif (mampu menyesuaikan) terhadap perubahan lingkungan strategis termasuk penyesuaian atas manajemen risiko di lingkungan Pemerintah Daerah.', 
            actionPlan: 'Koordinasi intensif dengan Tim Anggaran Pemerintah Daerah (TAPD) tentang ketersediaan anggaran serta kebutuhan anggaran yang fleksibel',
            status: 'Belum Selesai', 
            pic: 'Inspektur', 
            completionDate: '2026', 
            documentRef: '' 
          },
        ]
      },
      {
        id: 'e4-t3',
        name: 'Topik 3 - Perencanaan Kebutuhan dan Pengadaan SDM (A43)',
        aois: [
          { 
            id: 'e4-t3-a43', 
            code: 'A43', 
            title: 'Penetapan kebutuhan formasi auditor/P2UPD dari KemenPANRB serta rencana pemenuhan SDM jangka menengah dan panjang belum tersedia. Rekrutmen dan distribusi SDM belum sepenuhnya dapat ditelusuri keterkaitannya dengan hasil analisis kebutuhan yang telah disahkan.', 
            actionPlan: '1. Melakukan perhitungan ulang kebutuhan JFA dan P2UPD berdasarkan penugasan riil sesuai PKPT. 2. Menyampaiakn dokumen hasil Analisis Beban Kerja kepada BPKP untuk mendapatkan surat rekomendasi kebutuhan yang akan menjadi Dasar pengusulan formasi ke Kemenpan RB',
            status: 'Belum Selesai', 
            pic: 'Inspektur', 
            completionDate: '2026', 
            documentRef: '' 
          },
        ]
      },
      {
        id: 'e4-t4',
        name: 'Topik 4 - Pengembangan SDM Profesional APIP (A44)',
        aois: [
          { 
            id: 'e4-t4-a44', 
            code: 'A44', 
            title: 'Perencanaan pengembangan kompetensi SDM jangka menengah (lima tahun) berbasis gap kompetensi belum disusun, serta mekanisme pemantauan pemenuhan jam diklat dan prioritas sertifikasi belum dilakukan secara sistematis.', 
            actionPlan: '1. Menyusun analisis kesenjangan komptensi lima tahunan. 2. Menetapkan urutan prioritas sertifikasi seperti JFA, CGCAE, CFrA berdasarkan peran srtategis pegawai dan kebutuhan organisasi',
            status: 'Belum Selesai', 
            pic: 'Inspektur', 
            completionDate: '2026', 
            documentRef: '' 
          },
        ]
      },
      {
        id: 'e4-t5',
        name: 'Topik 5 - Dukungan terhadap Teknologi Informasi (A45)',
        aois: [
          { 
            id: 'e4-t5-a45', 
            code: 'A45', 
            title: 'Pemanfaatan teknologi informasi dalam pengawasan masih terbatas pada pengolahan data dasar dan belum didukung kebijakan, roadmap, serta integrasi sistem audit dan analitika data untuk mendukung pengawasan berbasis risiko.', 
            actionPlan: '1. Menyusun SK Inspektur ttg SOP untuk perolehan, penyimpanan dan pemanfaatan data digital dari OPD. 2. Membangun koneksi data dengan sistem keuangan (SIPD), sistem kepegawaian, sistem pengadaan (LPSE) untuk memfasilitasi pengambilan data secara online',
            status: 'Belum Selesai', 
            pic: 'Inspektur', 
            completionDate: '2026', 
            documentRef: '' 
          },
        ]
      }
    ]
  },
  {
    id: 'elemen-5',
    name: 'Elemen 5 - Budaya dan Hubungan Organisasi',
    topics: [
      {
        id: 'e5-t1',
        name: 'Topik 1 - Kualitas Komunikasi APIP (A52)',
        aois: [
          { 
            id: 'e5-t1-a52', 
            code: 'A52', 
            title: 'Komunikasi APIP dengan manajemen di lingkungan pemda belum secara optimal untuk menerapkan atau menginternalisasikan manajemen risiko melalui kegiatan fasilitasi penerapan atau internalisasi manajemen risiko di lingkungan pemda serta dukungan pimpinan daerah terhadap penguatan peran pengawasan intern perlu dioptimalkan melalui dukungan penyediaan sumber daya pengawasan yang memadai.', 
            actionPlan: '1. Menyelenggarakan bimbingan teknis bagi seluruh OPD untuk membantu menyusun Risk Register dan RTP secara mandiri. 2. Memperbaharui atau mensosialisasikan kembali Piagam Audit yang menegaskan dukungan penuh pimpinan daerah terhadap independensi dan pemenuhan sumber daya opersional APIP',
            status: 'Belum Selesai', 
            pic: 'Inspektur', 
            completionDate: '2026', 
            documentRef: '' 
          },
        ]
      },
      {
        id: 'e5-t2',
        name: 'Topik 2 - Koordinasi dengan Pihak Eksternal (A53)',
        aois: [
          { 
            id: 'e5-t2-a53', 
            code: 'A53', 
            title: 'Belum tersedia Standard Operating Procedure (SOP) tertulis terkait pembagian (sharing) data and informasi dengan pihak eksternal serta koordinasi dengan pihak eksternal masih bersifat insidentil dan komunikasi antar pemeriksa masih terbatas', 
            actionPlan: 'Menyusun SOP yang mengatur jenis data yang boleh dibagikan, klasifikasi kerahasiaan, prosedur permintaan data hingga media pertukaran data yang aman',
            status: 'Belum Selesai', 
            pic: 'Inspektur', 
            completionDate: '2026', 
            documentRef: '' 
          },
        ]
      },
      {
        id: 'e5-t3',
        name: 'Topik 3 - Akses Informasi & Sistem Informasi (A54)',
        aois: [
          { 
            id: 'e5-t3-a54', 
            code: 'A54', 
            title: 'Nilai tambah terhadap pengawasan intern masih terbatas, hasil pengawasan yang dilakukan oleh APIP cenderung masih menyasar pada perbaikan yang bersifat operasional dan belum dapat dimanfaatkan oleh pemimpin daerah sebagai dasar pengambilan keputusan strategis dan/atau penetapan kebijakan makro, yang dapat memberikan daya ungkit terhadap capaian kinerja pemerintah daerah.', 
            actionPlan: 'Melakukan perubahan pola pikir (mindset) melalui pelatihan internal agar auditor mampu melihat temuan tidak hanya sebagai kesalahan prosedur, tetapi sebagai indikator kegagalan sistemik yang menghambat visi-misi daerah.',
            status: 'Belum Selesai', 
            pic: 'Inspektur', 
            completionDate: '2026', 
            documentRef: '' 
          },
        ]
      }
    ]
  }
];
