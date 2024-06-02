// import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useSelector } from "react-redux";
import * as memberActions from "../../store/members";
import './MemberList.css'
import MemberForm from "./MemberForm";



const MemberListModal = ({ session, groupId }) => {
    const members = useSelector(memberActions.selectMember).entities;
    const ids = useSelector(memberActions.selectMember).allIds;

    return (
        <div id="members-modal-container">
            <h2 id="Member-modal-title">Members list</h2>
            {(members[session?.id]?.Membership?.status === 'Organizer' ||
                members[session?.id]?.Membership?.status === 'co-host') &&
                ids.map(id => (
                    <MemberForm
                        key={`member-form-span:${members[id]?.id}`}
                        name={`${members[id]?.firstName} ${members[id]?.lastName}`}
                        status={members[id]?.Membership?.status}
                        id={members[id]?.id}
                        auth={members[session?.id]?.Membership?.status}
                        groupId={groupId}
                    />
                ))}
            {(members[session?.id]?.Membership?.status === 'member' ||
                members[session?.id]?.Membership?.status === 'pending') &&
                ids.filter(id => members[id].Membership.status !== 'pending')
                    .map(id => (
                        <MemberForm
                            key={`member-form-span:${members[id]?.id}`}
                            name={`${members[id]?.firstName} ${members[id]?.lastName}`}
                            status={members[id]?.Membership?.status}
                            id={members[id]?.id}
                            auth={members[session?.id]?.Membership?.status}
                            groupId={groupId}
                        />
                    ))}
        </div>
    )
};

export default MemberListModal;
