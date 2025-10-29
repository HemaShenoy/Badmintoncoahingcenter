import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const cards = [
    { title: 'Coaches', description: 'Manage professional coaches and their expertise', icon: 'fa-user-tie', link: '/coaches', bgImage: '/images/coach.jpg' },
    { title: 'Students', description: 'View and manage student registrations', icon: 'fa-user-graduate', link: '/students', bgImage: '/images/student.jpg' },
    { title: 'Batches', description: 'Schedule and manage training batches', icon: 'fa-users', link: '/batches', bgImage: '/images/batch.jpg' },
    { title: 'Courts', description: 'Manage court assignments and availability', icon: 'fa-table-tennis', link: '/courts', bgImage: '/images/court.jpg' },
    { title: 'Tournaments', description: 'Organize and track tournament performances', icon: 'fa-trophy', link: '/tournaments', bgImage: '/images/tournament.jpg' },
    { title: 'Equipment', description: 'Track badminton equipment inventory', icon: 'fa-table-tennis-paddle-ball', link: '/equipment', bgImage: '/images/racket.jpg' },
    { title: 'Enrollments', description: 'Manage student enrollments in batches', icon: 'fa-clipboard-list', link: '/enroll', bgImage: '/images/enrolment.jpg' },
    { title: 'Payments', description: 'Track student payments and fees', icon: 'fa-credit-card', link: '/coach-payments', bgImage: '/images/payement.jpg' },
  ];

  const tournaments = [
    {
      id: 1,
      name: "Annual Championship",
      date: "June 15, 2025",
      location: "Main Arena, Court 3",
      coach: "Prakash Padukone",
      image: "/images/championship.jpg",
    },
    {
      id: 2,
      name: "Junior Open",
      date: "July 20, 2025",
      location: "Youth Center, Court 5",
      coach: "PV Sindhu",
      image: "/images/championship1.jpg",
    },
  ];

  const styles = {
    homeContainer: { fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '20px' },
    heroSection: {
      background: "url('/images/badminton.jpg') no-repeat center center/cover",
      height: '300px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
      fontSize: '24px',
    },
    statsContainer: { display: 'flex', justifyContent: 'center', gap: '20px', margin: '30px 0' },
    statCard: {
      background: '#1976D2',
      color: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
      width: '150px',
    },
    dashboardCards: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', padding: '20px' },
    dashboardCard: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
      background: 'white',
      textDecoration: 'none',
      color: 'black',
      transition: 'transform 0.3s',
    },
    cardContent: { padding: '15px' },
    cardIcon: { fontSize: '30px', marginBottom: '10px', color: '#1976D2' },
    tournamentsSection: { marginTop: '40px' },
    tournamentCards: { display: 'flex', justifyContent: 'center', gap: '20px' },
    tournamentCard: {
      background: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      overflow: 'hidden',
      textAlign: 'center',
      width: '250px',
      textDecoration: 'none', // Ensure link does not have default underline
      color: 'black',
    },
    tournamentCardImg: { width: '100%', height: '150px', objectFit: 'cover' },
  };

  return (
    <div style={styles.homeContainer}>
      <div style={styles.heroSection}>
        <h1>Ace Badminton Academy</h1>
        <p>Database Management System</p>
      </div>

      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <i className="fas fa-user-graduate"></i>
          <h3>200+</h3>
          <p>Active Students</p>
        </div>
        <div style={styles.statCard}>
          <i className="fas fa-user-tie"></i>
          <h3>15</h3>
          <p>Professional Coaches</p>
        </div>
        <div style={styles.statCard}>
          <i className="fas fa-table-tennis"></i>
          <h3>12</h3>
          <p>Premium Courts</p>
        </div>
        <div style={styles.statCard}>
          <i className="fas fa-trophy"></i>
          <h3>25+</h3>
          <p>Annual Tournaments</p>
        </div>
      </div>

      <h2>Database Management Modules</h2>
      <div style={styles.dashboardCards}>
        {cards.map((card, index) => (
          <Link to={card.link} style={styles.dashboardCard} key={index}>
            <div style={{ height: '150px', backgroundSize: 'cover', backgroundImage: `url(${card.bgImage})` }}></div>
            <div style={styles.cardContent}>
              <div style={styles.cardIcon}>
                <i className={`fas ${card.icon}`}></i>
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div style={styles.tournamentsSection}>
        <h2>Upcoming Tournaments</h2>
        <div style={styles.tournamentCards}>
          {tournaments.map((tournament) => (
            <Link key={tournament.id} to={`/tournaments/`} style={styles.tournamentCard}>
              <img src={tournament.image} alt="Tournament" style={styles.tournamentCardImg} />
              <div>
                <h3>{tournament.name}</h3>
                <p><i className="fas fa-calendar"></i> {tournament.date}</p>
                <p><i className="fas fa-map-marker-alt"></i> {tournament.location}</p>
                <p><i className="fas fa-user-tie"></i> Coach: {tournament.coach}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
