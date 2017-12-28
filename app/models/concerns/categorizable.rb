module Categorizable
  extend ActiveSupport::Concern

  def indicator
    default_indicators[category_type.to_sym]
  end

  def default_indicators
    {
      credit: :rolling_balance,
      savings: :rolling_balance,
      income: :total_transaction_value,
      expense: :total_transaction_value
    }
  end

  module ClassMethods
    def category_tree(project_name)
      categories = []
      types = where(project_name: project_name).pluck(:category_type).uniq

      types.sort.each do |type|
        children = where(project_name: project_name, category_type: type)
                    .pluck(:subcategory).uniq.compact.sort.map { |c| { name: c, value: c } }

        categories << { name: type, value: type, children: children, indicators: get_indicators(type) }
      end

      # Categories are sorted alphabetically, but income should be first
      income = categories.find { |category| category[:name] == 'income' }
      if income.present?
        categories.delete_if { |category| category[:name] == 'income' }
        categories.prepend(income)
      end

      categories
    end

    def get_indicators(type)
      case type
      when 'savings'
        [
          { name: 'Rolling balance', value: 'rolling_balance', default: true },
          { name: 'Withdrawals', value: 'withdrawals', default: false },
          { name: 'Deposits', value: 'deposits', default: false }
        ]
      when 'credit'
        [
          { name: 'Rolling balance', value: 'rolling_balance', default: true },
          { name: 'New borrowing', value: 'new_borrowing', default: false },
          { name: 'Repayement', value: 'repayement', default: false }
        ]
      when 'income', 'expense'
        [
          { name: 'Total transaction value', value: 'total_transaction_value', default: true },
          { name: 'Average value', value: 'avg_value', default: false }
        ]
      end
    end
  end
end
