class RoleType < EnumerateIt::Base
  associate_values(
    team: [1, 'Team'],
    advisor: [2, 'Advisor']
  )
end
