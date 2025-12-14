
// ---------- Utilities ----------
const vnd = (n)=> (Number(n||0)).toLocaleString('vi-VN') + '₫';
const rnd1to10M = ()=> Math.floor(Math.random()*(10_000_000-1_000_000+1))+1_000_000;
const SS_FLAG='nt_popup_shown';
const SS_APPLIED='nt_popup_applied_amount';

let baseIncome=150000; // demo seed
let baseExpense=45000;

function updateStats(){
  const applied = Number(sessionStorage.getItem(SS_APPLIED)||0);
  const income = baseIncome + applied;
  const expense = baseExpense;
  const balance = income - expense;
  const inEl = document.getElementById('stat-income');
  const outEl = document.getElementById('stat-expense');
  const balEl = document.getElementById('stat-balance');
  if(inEl) inEl.textContent = vnd(income);
  if(outEl) outEl.textContent = vnd(expense);
  if(balEl) balEl.textContent = vnd(balance);
}

// show popup after 30s once per session
function ensurePopup(){
  if(sessionStorage.getItem(SS_FLAG)){ updateStats(); return; }
  setTimeout(()=>{
    const b = document.querySelector('.modal-backdrop');
    if(!b) return;
    const amount = rnd1to10M();
    b.dataset.amount = String(amount);
    document.getElementById('popup-amount').textContent = vnd(amount);
    b.style.display='flex';
    sessionStorage.setItem(SS_FLAG,'1');
  }, 30000);
}
function closeModal(){
  const b = document.querySelector('.modal-backdrop');
  if(!b) return;
  const amount = Number(b.dataset.amount||0);
  if(amount>0 && !sessionStorage.getItem(SS_APPLIED)){
    sessionStorage.setItem(SS_APPLIED, String(amount));
  }
  b.style.display='none';
  updateStats();
}

// inject popup row on sao-ke
function injectPopupRowIfAny(){
  const applied = Number(sessionStorage.getItem(SS_APPLIED)||0);
  if(applied<=0) return;
  const tbody=document.getElementById('sk-body');
  if(!tbody) return;
  if(document.getElementById('row-popup')) return;
  const now = new Date().toISOString().replace('T',' ').slice(0,16);
  const tr = document.createElement('tr');
  tr.id='row-popup';
  tr.innerHTML = `<td>TRX-P</td><td>${now}</td><td><span class="badge">IN</span></td><td>${vnd(applied)}</td><td>Ủng hộ (demo popup)</td>`;
  tbody.prepend(tr);
}

// CSV safe download (delay revoke)
function downloadCSV(){
  const rows=[['id','datetime','type','amount','note'],
    ['TRX001','2025-12-08 09:31','IN','50000','Bạn A chuyển khoản nuôi tôi'],
    ['TRX002','2025-12-08 12:15','OUT','25000','Cơm trưa + canh'],
    ['TRX003','2025-12-09 08:02','OUT','5000','Sữa chua'],
    ['TRX004','2025-12-10 19:44','IN','100000','Bạn B ủng hộ'],
    ['TRX005','2025-12-10 20:10','OUT','15000','Rau + trứng']
  ];
  const applied = Number(sessionStorage.getItem(SS_APPLIED)||0);
  if(applied>0){
    const now = new Date().toISOString().replace('T',' ').slice(0,16);
    rows.splice(1,0,['TRX-P',now,'IN',String(applied),'Ủng hộ (demo popup)']);
  }
  const csv = rows.map(r => r.map(x=>`"${String(x).replace(/"/g,'""')}"`).join(',')).join('\n') + '\n';
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download='sao_ke.csv'; a.rel='noopener';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=> URL.revokeObjectURL(url), 1500);
}

// Simple tests (visible in console)
(function tests(){
  // CSV escaping
  const expectSub = '\"a,\"\"b\"\"\"';
  const sample = [['id','note'],['1','a,"b"']];
  const csv = sample.map(r=>r.map(x=>`"${String(x).replace(/"/g,'""')}"`).join(',')).join('\n');
  console.assert(csv.includes('"a,""b"""'), 'CSV escape failed', csv);
})();

// Expose
window.NT = { updateStats, ensurePopup, closeModal, injectPopupRowIfAny, downloadCSV };
