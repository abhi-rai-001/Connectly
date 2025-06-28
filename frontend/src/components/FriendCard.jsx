import { Link } from "react-router";
import { MessageCircle } from "lucide-react";
import { getLanguageFlag } from "./GetFlag";

const FriendCard = ({ friend }) => {
    console.log(friend)

  return (
    <div className="card bg-base-100 shadow-sm hover:shadow-md transition-all duration-300 border border-base-200/60 hover:border-primary/30 group hover:-translate-y-0.5">
      <div className="card-body p-4">
        {/* Avatar & Name */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar">
            <div className="w-12 rounded-full ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
              <img
                src={friend.profilePic}
                alt={friend.fullname}
                loading="lazy"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="grow min-w-0">
            <h3 className="font-semibold text-base truncate text-base-content/90">
              {friend.fullname}
            </h3>
            <p className="text-xs text-base-content/50 truncate">
              Language partner
            </p>
          </div>
        </div>

        {/* Languages */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="badge badge-outline gap-1.5 items-center py-1.5 px-2.5 border-base-300/60 group-hover:border-primary/30 transition-colors">
            <span className="text-sm">{getLanguageFlag(friend.nativeLanguage)}</span>
            <span className="text-xs font-medium capitalize text-base-content/80">
              {friend.nativeLanguage}
            </span>
          </span>

          <span className="badge badge-secondary/10 gap-1.5 items-center py-1.5 px-2.5 border border-secondary/20 group-hover:border-secondary/40 transition-colors">
            <span className="text-sm">{getLanguageFlag(friend.learningLanguage)}</span>
            <span className="text-xs font-medium capitalize text-secondary">
              {friend.learningLanguage}
            </span>
          </span>
        </div>

        {/* CTA */}
        <Link
          to={`/chat/${friend._id}`}
          className="btn btn-primary btn-sm w-full flex items-center gap-2 group/button"
        >
          <MessageCircle className="size-4 transition-transform group-hover/button:scale-110" />
          <span className="text-sm">Message</span>
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;