
// Simple money formatter (VND)
function vnd(n){return n.toLocaleString('vi-VN') + '₫'}

// 30s popup once per session
(function(){
  const FLAG='popup_shown';
  if (sessionStorage.getItem(FLAG)) return;
  setTimeout(()=>{
    const b = document.querySelector('.modal-backdrop');
    if (!b) return;
    document.getElementById('popup-amount').textContent = vnd(2000000);
    b.style.display='flex';
    sessionStorage.setItem(FLAG,'1');
  }, 30000);
})();

function closeModal(){ document.querySelector('.modal-backdrop').style.display='none'; }

// CSV download (on sao-ke page)
function downloadCSV(){
  const rows=[['id','datetime','type','amount','note'],
  ['TRX001','2025-12-08 09:31','IN','50000','Bạn A chuyển khoản nuôi tôi'],
  ['TRX002','2025-12-08 12:15','OUT','25000','Cơm trưa + canh'],
  ['TRX003','2025-12-09 08:02','OUT','5000','Sữa chua'],
  ['TRX004','2025-12-10 19:44','IN','100000','Bạn B ủng hộ'],
  ['TRX005','2025-12-10 20:10','OUT','15000','Rau + trứng']
  ];
  const csv = rows.map(r=>r.map(x=>`"${String(x).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download='sao_ke.csv'; a.click();
  URL.revokeObjectURL(url);
}
