import "../../assets/scss/spinner.scss";

const LoadingSpinner = ({ size = 50, color = '#8d75c6' }) => {

    return(
    <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      border: `${size / 10}px solid rgba(0, 0, 0, 0.1)`,
      borderTopColor: color,
      animation: 'spin 1s linear infinite',
      margin: '0 auto',
      marginTop:'50px',
      justifyContent:'center',
      marginBottom:'20px',
      alignItems:'center'
    }}
  />
    )

}

export default LoadingSpinner