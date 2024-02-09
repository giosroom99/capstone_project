const OrganizationTree = ({ roleData }) => {
  const buildTree = (userId) => {
    const userNode = {
      id: userId,
      name: `User ${userId}`,
      children: [],
    };

    const subordinates = roleData.users_reporting_mngr.filter(
      (subordinateId) => subordinateId !== userId
    );
    if (subordinates.length > 0) {
      userNode.children = subordinates.map((subordinateId) =>
        buildTree(subordinateId)
      );
    }

    return userNode;
  };

  const rootNode = {
    id: roleData.r_id,
    name: roleData.r_name,
    children: roleData.users_reporting_mngr.map((userId) => buildTree(userId)),
  };

  const renderTree = (node) => (
    <ul key={node.id}>
      <li>{node.name}</li>
      {node.children.length > 0 && (
        <li>
          {node.children.map((child) => (
            <ul key={child.id}>{renderTree(child)}</ul>
          ))}
        </li>
      )}
    </ul>
  );

  return <div>{renderTree(rootNode)}</div>;
};

export default OrganizationTree;
