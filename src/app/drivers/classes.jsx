export const CustomLabel = ({ children }) => {
    return (
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {children}
        </label>
    )
  
  }

export const ErrorClass = ({ error }) => {
  return <p className="text-red-500 text-xs italic">{error}</p>
}