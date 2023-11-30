import "./Navbar.css";
import {
  Select,
  SelectItem,
  Avatar,
  Input,
  Image,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

import logo from "../../../assets/navlogo.svg";

const Navbar = () => {
  // const avatarSrc = "https://i.pravatar.cc/150?u=a042581f4e29026704d";
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div>
        <Image
          isBlurred
          width={100}
          src={logo}
          alt="Nyaysaarthi Logo"
          classNames="m-5"
        />
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <div>
          <Input
            size="sm"
            isClearable
            radius="lg"
            classNames={{
              label: "text-black/50 dark:text-white/90 input",
            }}
            placeholder="Type to search..."
            aria-label="Search"
            startContent={<i className="fa-solid fa-magnifying-glass"></i>}
          />
        </div>
        <div>
          <Select
            size="sm"
            defaultSelectedKeys={["dadar"]}
            style={{ width: "200px", borderRadius: "10px" }}
            startContent={<i className="fa-solid fa-location-dot"></i>}
            aria-label="Select a location"
          >
            <SelectItem key="dadar" value="dadar">
              Dadar,Mumbai
            </SelectItem>
          </Select>
        </div>
        <div>
          <Select
            size="sm"
            label="Services"
            className="max-w-xs"
            style={{ width: "200px" }}
            aria-label="Select a service"
          >
            <SelectItem key="dadar" value="dadar">
              Dadar, Mumbai
            </SelectItem>
          </Select>
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div className="features" style={{ marginRight: "20px" }}>
          <div className="message">
            <i className="fa-solid fa-message icon" style={{fontSize: "15px"}} onClick={() => navigate("/messages")}></i>
          </div>
          <div className="bell">
            <i className="fa-solid fa-bell icon" style={{fontSize: "18px"}}></i>
          </div>
        </div>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
