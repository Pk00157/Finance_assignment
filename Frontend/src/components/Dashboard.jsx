import { useEffect, useState } from "react";


export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
    const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")
    
  const fetchSummary = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/summary", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      setSummary(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/transactions", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error(err);
    }
  };


  
  const deleteTransaction = async (id) => {
  const token = localStorage.getItem("token");

  try {
    await fetch(`http://localhost:3000/api/transactions/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // refresh list
    fetchTransactions();
  } catch (err) {
    console.error(err);
  }
};
const fetchUsers = async () => {
  const token = localStorage.getItem("token");


  try {
    const res = await fetch("http://localhost:3000/api/users", {
        method : "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    console.log(data)
    setUsers(data);

  } catch (err) {
    console.error(err);
  }
};


const updateTransaction = async (t) => {
  const token = localStorage.getItem("token");

  const newAmount = prompt("Enter new amount", t.amount);
  const newCategory = prompt("Enter new category", t.category);

  if (!newAmount || !newCategory) return;

  try {
    await fetch(`http://localhost:3000/api/transactions/${t._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        amount: Number(newAmount),
        category: newCategory
      })
    });

    fetchTransactions();
  } catch (err) {
    console.error(err);
  }
};

const updateUserRole = async (userId) => {
  const token = localStorage.getItem("token");

  const newRole = prompt("Enter role: viewer / analyst / admin");

  if (!newRole) return;

  try {
    await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ role: newRole })
    });

    fetchUsers(); // refresh list
  } catch (err) {
    console.error(err);
  }
};


  useEffect(() => {
    fetchSummary();
    fetchTransactions();
     if(role === "admin"){
         fetchUsers(); 
     }

   
  
  }, []);
console.log(summary)
  return (
    <div>
      <h1>Dashboard</h1>
      { role === "admin" && (
  <div>
    <h2>Admin Panel</h2>

    {users.map((u) => (
      <div key={u._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
        <p>{u.email}</p>
        <p>Role: {u.role}</p>

        <button onClick={() => updateUserRole(u._id)}>
          Change Role
        </button>
      </div>
    ))}
  </div>
)}

      {/* SUMMARY */}
      {(role === "admin" || "analyst") && summary && (
        
        <div>
             <h2>Summary</h2>
          <p>Total Income: {summary.totalIncome}</p>
          <p>Total Expense: {summary.totalExpense}</p>
          <p>Net Balance: {summary.netBalance}</p>

          <h2>Category Breakdown</h2>

{summary?.categoryWise.map((c, index) => {
    
  const percent = summary.totalExpense
    ? ((c.total / summary.totalExpense) * 100).toFixed(1)
    : 0;

  return (
    <div key={index}>
      <p>
        {c._id} : ₹{c.total} ({percent}%)
      </p>
    </div>
  );
})}

 <h2>Monthly Breakdown</h2>
{summary?.monthlyTrends.map((m, index) => {
    
 

  return (
    <div key={index}>
      <p>
        {m._id.month} : ₹{m.total} 
      </p>
    </div>
  );
})}
        </div>
      )}

      <hr />

      {/* TRANSACTIONS */}
      <h2>Transactions</h2>
      {transactions.map((t) => (
  <div key={t._id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
    <p>{t.type} - ₹{t.amount} - {t.category}</p>

    <button onClick={() => updateTransaction(t)}>
      Update
    </button>

    <button onClick={() => deleteTransaction(t._id)}>
      Delete
    </button>
  </div>
))}
    </div>
  );
}