import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const backendUrl = import.meta.env.VITE_API_URL;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

const Leaderboard = () => {
  const [view, setView] = useState("weekly");
  const [friendsOnly, setFriendsOnly] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Theme state
  const [theme, setTheme] = useState({
    primary: "#ffffff",
    secondary: "#f0f0f0",
    tertiary: "#e0e0e0",
    text: "#000000",
    accent: "#000000",
  });

  // Load theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      try {
        setTheme(JSON.parse(storedTheme));
      } catch (err) {
        console.error("Failed to parse theme from localStorage", err);
      }
    }
  }, []);

  const getCurrentUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const base64Payload = token.split(".")[1];
      const payload = JSON.parse(atob(base64Payload));
      return payload.id;
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };

  useEffect(() => {
    const id = getCurrentUserIdFromToken();
    setCurrentUserId(id);
  }, []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/leaderboard?period=${view}&friendsOnly=${friendsOnly}`,
          getAuthHeader()
        );
        setLeaderboard(res.data);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, [friendsOnly, view]);

  const handleDropdownClick = (viewType) => {
    setView(viewType);
  };

  const handleFriendsOnlyToggle = () => {
    setFriendsOnly((prev) => !prev);
  };

  const currentUser = leaderboard.find((user) => user.userId === currentUserId);

  const getBadge = (rank) => {
    switch (rank) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return `${rank + 1}.`;
    }
  };

  return (
    <div
      className="p-6 pl-0 rounded-3xl shadow-md text-center w-full bg-[var(--bg-sec)]"
    >
      <nav className="flex justify-between items-center pl-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <strong>Leaderboard</strong>
        </h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-1"
              color="transparent"
              motionProps={{
                initial: { opacity: 0, y: 10, scale: 0.97 },
                animate: { opacity: 1, y: 0, scale: 1 },
                transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                whileHover: {},
                whileTap: { scale: 0.96 }
              }}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}{" "}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[var(--bg-sec)]">
            <DropdownMenuItem onSelect={() => handleDropdownClick("daily")}>
              Daily
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleDropdownClick("weekly")}>
              Weekly
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleDropdownClick("monthly")}>
              Monthly
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      {/* Friends Only Toggle */}
      <div className="mt-4 flex pl-6 items-center gap-2">
        <label className="text-sm" >
          Friends Only
        </label>
        <Button
          variant="outline"
          onClick={handleFriendsOnlyToggle}
          className="relative w-14 h-8 rounded-full px-0 border-2 transition-all duration-200"
          color="transparent"
          motionProps={{
            initial: { opacity: 0, y: 10, scale: 0.97 },
            animate: { opacity: 1, y: 0, scale: 1 },
            transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
            whileHover: {},
            whileTap: {}
          }}
        >
          <span
            className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full transition-transform duration-200"
            style={{
              backgroundColor: "var(--txt)",
              transform: friendsOnly ? "translateX(24px)" : "translateX(0px)",
            }}
          ></span>
        </Button>
      </div>

      {/* Leaderboard */}
      <div className="mt-4">
        <ul
          className="rounded-lg overflow-hidden"
          style={{ backgroundColor: theme.primary }}
        >
          {leaderboard.slice(0, 10).map((user, index) => {
            const isCurrentUser = user.userId === currentUserId;

            return (
              <li
                key={user.userId}
                className="flex justify-between items-center py-3 px-5 transition-all duration-200"
                style={{
                  backgroundColor: isCurrentUser
                    ? theme.accent
                    : theme.secondary,
                  color: isCurrentUser ? theme.tertiary : theme.text,
                  fontWeight: isCurrentUser ? "600" : "normal",
                }}
              >
                <span className="flex items-center gap-2">
                  <span className="w-6 text-right">{getBadge(index)}</span>
                  <span>{user.username}</span>
                </span>
                <span className="text-sm">{user.totalDuration} minutes</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Current User Position */}
      {currentUserId && currentUser && (
        <div className="mt-4 text-lg font-semibold">
          Your Position:{" "}
          {leaderboard.findIndex((u) => u.userId === currentUserId) + 1} -{" "}
          ({currentUser.totalDuration} minutes)
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
