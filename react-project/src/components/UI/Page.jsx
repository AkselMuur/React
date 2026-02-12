import Header from './Header.jsx';

const Page=(props) => {
    return (
        <div id='app' className={props.theme}>
            <Header/>
            <article>
                <h2>React Course</h2>
                <p>
                    A course that teaches you React.
                </p>
            </article>
        </div>
    );
}

export default Page