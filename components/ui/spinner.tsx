type SpinnerType = {
    width: string;
    height: string;
    borderWidth: string;
};

const Spinner = ({ width, height, borderWidth }: SpinnerType) => {
    return (
        <div
            className={`inline-block ${width} ${height} animate-spin rounded-full ${borderWidth} border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white`}
            role="status"
        >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
            </span>
        </div>
    );
};

export default Spinner;
