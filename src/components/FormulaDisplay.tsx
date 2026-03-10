import { motion } from 'framer-motion';
import './FormulaDisplay.css';

interface FormulaDisplayProps {
    width: number;
    height: number;
}

export function FormulaDisplay({ width, height }: FormulaDisplayProps) {
    const isSelected = width > 0 && height > 0;
    const area = width * height;

    return (
        <div className="formula-container">
            {isSelected ? (
                <motion.div
                    className="formula-content"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={`${width}x${height}`}
                >
                    <div className="equation">
                        <span className="number width">{width}</span>
                        <span className="operator">×</span>
                        <span className="number height">{height}</span>
                        <span className="operator">=</span>
                        <span className="number result">{area}</span>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    className="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    Select an area
                </motion.div>
            )}
        </div>
    );
}
