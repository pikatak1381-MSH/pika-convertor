interface CalculatorShellProps {
  title: string
  children: React.ReactNode
}

const CalculatorShell: React.FC<CalculatorShellProps> = ({ title, children }) => {
  return (
    <div className="mx-auto mt-13 w-full max-w-[794px] rounded-[20px] border bg-white p-6 shadow-md">
      {/* Mini Title */}
      <h3 className="text-start font-bold">{title}</h3>

      {/* Calculator Inputs */}
      {children}
      <hr className="my-6" />
    </div>
  )
}

export default CalculatorShell
