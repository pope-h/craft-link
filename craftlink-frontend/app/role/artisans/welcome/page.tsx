import WelcomePage from "@/components/WelcomePage";

export default function Welcome () {
    return <div className="relative">
        <WelcomePage image={"/welcome-artisan.png"} username={"Abdul"} role={"artisan"}/>
    </div>
}