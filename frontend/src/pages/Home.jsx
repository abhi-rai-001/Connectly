import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import {
  getOutgoingFriendReq,
  getRecommendedUsers,
  getUserFriends,
  sendFriendReq,
} from "../lib/api";
import {
  CheckCircleIcon,
  MapIcon,
  UserIcon,
  UserPlusIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import FriendCard from "../components/FriendCard";
import NoFriends from "../components/NoFriends";
import { getLanguageFlag } from "../components/GetFlag";
import { capitalize } from "../utils/capitalize";


const Home = () => {
  const queryClient = useQueryClient();
  const [outgoingReq, setOutgoingReq] = useState(new Set());

  const {
    data: friends = [],
    isLoading: loadingFriends,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const {
    data: recommendedUsers = [],
    isLoading: loadingUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReq } = useQuery({
    queryKey: ["outgoingFriendReq"],
    queryFn: getOutgoingFriendReq,
  });

  const { mutate: sendReqMutation, isPending } = useMutation({
    mutationFn: sendFriendReq,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReq"] });
    },
  });

  useEffect(() => {
    const ids = new Set();
    outgoingFriendReq?.forEach((req) => ids.add(req.recipient._id));
    setOutgoingReq(ids);
  }, [outgoingFriendReq]);

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10 flex-1">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Your Friends
          </h2>
          <Link className="btn btn-outline btn-sm" to="/notifications">
            <UserIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        <section className="space-y-4">
          <h3 className="text-xl font-semibold">
            Your Friends ({friends.length})
          </h3>

          {loadingFriends ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner" />
            </div>
          ) : friends.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {friends.map((friend) => (
                <FriendCard key={friend._id} friend={friend} />
              ))}
            </div>
          ) : (
            <NoFriends />
          )}
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-semibold">People You May Know</h3>

          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner" />
            </div>
          ) : recommendedUsers.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {recommendedUsers.map((user) => {
                const hasReqSent = outgoingReq.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="card cursor-pointer bg-base-100 border border-base-200 hover:shadow-lg hover:border-primary/30 transition-all rounded-xl overflow-hidden"
                  >
                    <div className="card-body p-5 space-y-4">
                      {/* Avatar + Name */}
                      <div className="flex items-start gap-4">
                        <div className="avatar">
                          <div className="w-16 rounded-full ring-2 ring-primary/20 hover:ring-primary/40 overflow-hidden">
                            <img
                              src={user.profilePic}
                              alt={user.fullname}
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = DEFAULT_AVATAR;
                              }}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="card-title font-semibold text-lg line-clamp-2">
                            {user.fullname}
                          </h3>
                          {user.location && (
                            <div className="flex items-center text-sm text-base-content/60 mt-1">
                              <MapIcon className="size-3.5 mr-1.5" />
                              <span className="truncate">{user.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Bio */}
                      {user.bio && (
                        <p className="text-sm text-base-content/70 line-clamp-3">
                          {user.bio}
                        </p>
                      )}

                      {/* Languages */}
                      <div className="flex flex-wrap gap-2">
                        <span className="badge bg-secondary/50 text-xs p-2 flex items-center gap-1">
                          <b>Native:&nbsp;</b>
                          {capitalize(user.nativeLanguage)}
                          {getLanguageFlag(user.nativeLanguage)}
                        </span>

                        <span className="badge badge-outline text-xs p-2 flex items-center gap-1">
                          <b>Learning:&nbsp;</b>
                          {capitalize(user.learningLanguage)}
                          {getLanguageFlag(user.learningLanguage)}
                        </span>
                      </div>

                      {/* Action Button */}
                      <button
                        type="button"
                        className={`btn w-full min-h-[42px] mt-3 flex justify-center items-center transition-colors duration-200 ${
                          hasReqSent ? "btn-disabled" : "btn-primary"
                        }`}
                        onClick={() => sendReqMutation(user._id)}
                        disabled={hasReqSent || isPending}
                      >
                        {hasReqSent ? (
                          <>
                            <CheckCircleIcon className="size-4 mr-2" />
                            Request Sent
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="size-4 mr-2" />
                            Send Friend Request
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg mb-3">
                No recommendations available
              </h3>
              <p className="text-base-content opacity-70 mb-4">
                We couldn’t find users right now. Try updating your profile or
                checking back later.
              </p>
              <Link to="/update-profile" className="btn btn-sm btn-outline">
                Update Profile
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;