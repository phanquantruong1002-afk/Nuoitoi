
// Utilities
function vnd(n){return n.toLocaleString('vi-VN') + '₫'}
function rnd1to10M(){return Math.floor(Math.random()*(10000000-1000000+1))+1000000}

// Persistent session flags
const FLAG='popup_shown';
const APPLIED='popup_applied_amount';

// Homepage counters
let baseIncome = 150000;  // initial demo
let baseExpense = 45000;

function updateStats(){
  const applied = Number(sessionStorage.getItem(APPLIED) || 0);
  const income = baseIncome + applied;
  const expense = baseExpense;
  const balance = income - expense;
  const elIn = document.getElementById('stat-income');
  const elOut = document.getElementById('stat-expense');
  const elBal = document.getElementById('stat-balance');
  if(elIn) elIn.textContent = vnd(income);
  if(elOut) elOut.textContent = vnd(expense);
  if(elBal) elBal.textContent = vnd(balance);
}

function ensurePopup(){
  if (sessionStorage.getItem(FLAG)) { updateStats(); return; }
  setTimeout(()=>{
    const b = document.querySelector('.modal-backdrop');
    if (!b) return;
    const amount = rnd1to10M();
    document.getElementById('popup-amount').textContent = vnd(amount);
    b.dataset.amount = amount;
    b.style.display='flex';
    sessionStorage.setItem(FLAG,'1');
  }, 30000);
}

function closeModal(){
  const b = document.querySelector('.modal-backdrop');
  if(!b) return;
  const amount = Number(b.dataset.amount || 0);
  if(amount>0 && !sessionStorage.getItem(APPLIED)){
    sessionStorage.setItem(APPLIED, String(amount));
  }
  b.style.display='none';
  updateStats();
}

// Sao ke injection
function maybeInjectRow(){
  const applied = Number(sessionStorage.getItem(APPLIED) || 0);
  if(applied<=0) return;
  const tbody = document.querySelector('#sk-body');
  if(!tbody) return;
  // Avoid duplicate
  if(document.getElementById('row-popup')) return;
  const now = new Date().toISOString().replace('T',' ').slice(0,16);
  const tr = document.createElement('tr');
  tr.id='row-popup';
  tr.innerHTML = `<td>TRX-P</td><td>${now}</td><td><span class="badge">IN</span></td><td>${vnd(applied)}</td><td>Ủng hộ (demo popup)</td>`;
  tbody.prepend(tr);
}

// CSV download (on sao-ke page)
function downloadCSV(){
  const rows=[['id','datetime','type','amount','note'],
  ['TRX001','2025-12-08 09:31','IN','50000','Bạn A chuyển khoản nuôi tôi'],
  ['TRX002','2025-12-08 12:15','OUT','25000','Cơm trưa + canh'],
  ['TRX003','2025-12-09 08:02','OUT','5000','Sữa chua'],
  ['TRX004','2025-12-10 19:44','IN','100000','Bạn B ủng hộ'],
  ['TRX005','2025-12-10 20:10','OUT','15000','Rau + trứng']
  ];
  const applied = Number(sessionStorage.getItem(APPLIED) || 0);
  if(applied>0){
    const now = new Date().toISOString().replace('T',' ').slice(0,16);
    rows.splice(1,0,['TRX-P',now,'IN',String(applied),'Ủng hộ (demo popup)']);
  }
  const csv = rows.map(r=>r.map(x=>`"${String(x).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download='sao_ke.csv'; a.click();
  URL.revokeObjectURL(url);
}

// Expose
window.NT = { updateStats, ensurePopup, closeModal, maybeInjectRow, downloadCSV };
