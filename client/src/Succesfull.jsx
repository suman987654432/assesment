import React from 'react'

const Succesfull = () => {
  return (
    <>
    <div style={styles.container}>
        <h2 style={styles.message}>Payment succesfull..</h2>
        <p style={styles.text}>Thank you for purchasing</p>
    </div>
    </>
  )
}

const styles = {
  container: {
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#f0f8ff',
  },
  message: {
    color: '#28a745',
    fontSize: '2rem',
    marginBottom: '10px',
  },
  text: {
    fontSize: '1.2rem',
    color: '#333',
  },
};

export default Succesfull