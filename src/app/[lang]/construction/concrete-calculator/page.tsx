import CalculatorRenderer from "@/components/tools/CalculatorRenderer";
import { config } from "@/tools/construction/concrete-calculator/config";
import { schema } from "@/tools/construction/concrete-calculator/schema";

export default function Page(){
  return (
    <CalculatorRenderer
      config={config}
      schema={schema}
      // Đã xóa prop calculator={}
    />
  )
}