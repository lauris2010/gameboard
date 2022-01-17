import Spinner from "react-loader-spinner";

export const Loader = () => {
    return (
        <Spinner 
            className='spinner'
            type="Oval"
            color="#00BFFF"
            height={80}
            width={100}
        />
    )
}