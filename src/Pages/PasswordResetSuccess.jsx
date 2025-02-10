
const PasswordResetSuccess = () => {
    return (
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Password Reset Requested</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            If your email is registered, you will receive a password reset link shortly.
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <p className="text-gray-700">Check your email for a reset link.</p>
            <a href="/" className="mt-4 inline-block text-blue-600 hover:text-blue-500">Back to Login</a>
          </div>
        </div>
      </div>
    );
  };
  
  export default PasswordResetSuccess;
  