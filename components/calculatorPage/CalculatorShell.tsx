
interface CalculatorShellProps {
  title: string
  children: React.ReactNode
}

const CalculatorShell: React.FC<CalculatorShellProps> = ({ title, children }) => {
  return (
    <div
      className="mx-auto w-full max-w-[794px] rounded-[20px] bg-white border shadow-md p-6 mt-13"
    >
      {/* Mini Title */}
      <h3 className="text-start font-bold">
        {title}
      </h3>

      {/* Calculator Inputs */}
      {children}
      <hr className="my-6" />
    </div>
  )
}

export default CalculatorShell
