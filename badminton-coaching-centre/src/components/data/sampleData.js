export const students = [
    { id: 1, name: "John Doe", age: 15, phone: "1234567890" },
    { id: 2, name: "Jane Smith", age: 17, phone: "9876543210" },
  ];
  
  export const coaches = [
    { id: 1, name: "Coach Mike", specialization: "Smash", experience: 5, phone: "1234567890" },
    { id: 2, name: "Coach Emma", specialization: "Defense", experience: 3, phone: "9876543210" },
  ];
  
  export const studentPayments = [
    { id: 1, student: "John Doe", amount: 5000, date: "2025-02-01", method: "Credit Card", status: "Paid" },
    { id: 2, student: "John Doe", amount: 5200, date: "2025-03-01", method: "UPI", status: "Paid" },
    { id: 3, student: "John Doe", amount: 5300, date: "2025-04-01", method: "Net Banking", status: "Upcoming" },
  
    { id: 4, student: "Jane Smith", amount: 4500, date: "2025-02-10", method: "Debit Card", status: "Paid" },
    { id: 5, student: "Jane Smith", amount: 4600, date: "2025-03-10", method: "UPI", status: "Paid" },
    { id: 6, student: "Jane Smith", amount: 4700, date: "2025-04-10", method: "Credit Card", status: "Upcoming" },
  
    { id: 7, student: "Mike Johnson", amount: 6000, date: "2025-01-15", method: "Credit Card", status: "Paid" },
    { id: 8, student: "Mike Johnson", amount: 6200, date: "2025-02-15", method: "UPI", status: "Paid" },
    { id: 9, student: "Mike Johnson", amount: 6400, date: "2025-03-15", method: "Net Banking", status: "Upcoming" },
  ];
  
  export default studentPayments;
  
 
  export const tournaments = [
    { id: 1, name: "National Open", date: "2025-04-10", location: "Delhi", coach: "Coach Mike" },
    { id: 2, name: "State Championship", date: "2025-05-15", location: "Mumbai", coach: "Coach Emma" },
  ];
  
  export const equipmentList = [
    { id: 1, name: "Shuttlecock", quantity: 100, condition: "Good" },
    { id: 2, name: "Badminton Racket", quantity: 20, condition: "Excellent" },
    { id: 3, name: "Net", quantity: 5, condition: "Good" },
  ];
  
  export const courts = [
    { id: 1, name: "Court A", location: "Building 1", type: "Indoor" },
    { id: 2, name: "Court B", location: "Building 2", type: "Outdoor" },
  ];
  
  export const modelLogins = {
    students: [
      { username: "hema", password: "1239", fullName: "John Doe" },
      { username: "JaneSmith", password: "jane456", fullName: "Jane Smith" },
      { username: "MikeJohnson", password: "mike789", fullName: "Mike Johnson" },
      { username: "EmilyDavis", password: "emily321", fullName: "Emily Davis" },
      { username: "DavidBrown", password: "david654", fullName: "David Brown" },
    ],
    coaches: [
      { username: "PV Sindhu", password: "1234", fullName: "Coach Williams" },
      { username: "CoachAnderson", password: "coach456", fullName: "Coach Anderson" },
      { username: "CoachMiller", password: "coach789", fullName: "Coach Miller" },
      { username: "CoachClark", password: "coach321", fullName: "Coach Clark" },
    ],
  };
  