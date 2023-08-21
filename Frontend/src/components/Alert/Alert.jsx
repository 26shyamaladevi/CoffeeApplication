const Alert = ({ message, type }) => {
  let alertClasses = "mb-4 rounded-lg px-6 py-5 text-base";

  if (type === "success") {
    alertClasses += " bg-green-100 text-green-700";
  } else if (type === "error") {
    alertClasses += " bg-red-100 text-red-700";
  } else if (type === "warning") {
    alertClasses += "bg-yellow-100 text-yellow-700";
  } else {
    alertClasses += " bg-blue-100 text-blue-700";
  }
  console.log(message);
  return (
    <div className={alertClasses} role='alert'>
      {message}
    </div>
  );
};

export default Alert;
