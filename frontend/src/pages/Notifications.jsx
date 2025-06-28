import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendReq, getFriendRequests } from "../lib/api";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";

const Notifications = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });
   
  const { mutate: acceptReqMutation, isPending } = useMutation({
    mutationFn: acceptFriendReq,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReq || [];
  const acceptedRequests = friendRequests?.acceptedReq || [];
  return (
    <div>
      <div className="p-4 sm:p-6 lg:p-6">
        <div className="container mx-auto max-w-4xl space-y-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Notifications
          </h1>
          {isLoading ? (
            <div className="flex justify-cente py-12">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <>
              {incomingRequests.length > 0 && (
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <UserCheckIcon className="size-5text-primary" /> Friend
                    Requests
                    <span className="badge badge-primary mt-2">
                      {incomingRequests.length}
                    </span>
                  </h2>
                  <div className="space-y-3">
                    {incomingRequests.map((req) => (
                      <div
                        key={req._id}
                        className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="card-body p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="avatar w-14 h-14 rounded-full bg-base-300 overflow-hidden">
                                <img
                                  src={req.sender.profilePic}
                                  alt={req.sender.fullname}
                                />
                              </div>
                              <div>
                                <h3 className="font-semibold">
                                  {req.sender.fullname}
                                </h3>
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                  <span className="badge badge-secondary badge-sm">
                                    Native: {req.sender.nativeLanguage}
                                  </span>
                                  <span className="badge badge-outline badge-sm">
                                    Learning: {req.sender.learningLanguage}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => acceptReqMutation(req._id)}
                              disabled={isPending}
                            >
                              Accept
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              {/* ACCEPTED REQUESTS  */}
              {acceptedRequests.length > 0 && (
  <section className="space-y-4">
    {/* Heading */}
    <h2 className="text-xl font-semibold flex items-center gap-2">
      <BellIcon className="h-5 w-5 text-success" />
      New Connections
    </h2>

    {/* List of newly-accepted friends */}
    <div className="space-y-3">
      {acceptedRequests.map(notification => (
        <div
          key={notification._id}
          className="card bg-base-200 shadow-sm"
        >
          <div className="card-body p-4">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="avatar mt-1 w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={notification.recipient.profilePic}
                  alt={notification.recipient.fullname}
                />
              </div>

              {/* Main text */}
              <div className="flex-1 ">
                <h3 className="font-semibold">
                  {notification.recipient.fullname} accepted your friend request
                </h3>

                <p className="text-xs flex items-center opacity-70">
                  <ClockIcon className="h-3 w-3 mr-1" />
                  Recently
                </p>
              </div>

              {/* Status badge */}
              <div className="badge badge-success flex items-center gap-1">
                <MessageSquareIcon className="h-3 w-3" />
                New&nbsp;Friend
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
)}
{incomingRequests.length === 0 && acceptedRequests.length === 0 && (
  <NoNotificationsFound />
)}

            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
