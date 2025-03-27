import WelcomePage from "@/components/WelcomePage";

export default function Welcome () {
    return <div className="relative">
        <WelcomePage image={"/welcome-client.png"} username={"Abdul"} role={"client"}/>
    </div>
}