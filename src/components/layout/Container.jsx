import '../../styles/components/layout/container.sass'

function Container({ children }) {
    return (
        <main className='container'>{children}</main>
    )
}

export default Container;