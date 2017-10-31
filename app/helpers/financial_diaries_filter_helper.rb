module FinancialDiariesFilterHelper
  def gender_options
    [
      {
        name: 'Male',
        value: 'male'
      },
      {
        name: 'Female',
        value: 'female'
      }
    ]
  end

  def age_options
    [
      {
        name: '18-25',
        value: {
          min_age: 18,
          max_age: 25
        }
      },
      {
        name: '25-35',
        value: {
          min_age: 25,
          max_age: 35
        }
      },
      {
        name: '35-45',
        value: {
          min_age: 35,
          max_age: 45
        }
      },
      {
        name: '45-60',
        value: {
          min_age: 45,
          max_age: 60
        }
      },
      {
        name: '>60',
        value: {
          min_age: 60,
          max_age: 200
        }
      }
    ]
  end
end